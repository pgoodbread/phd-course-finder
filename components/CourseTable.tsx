import { Course } from ".prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ButtonStyle from "./ButtonStyle";
import Image from "next/image";
import DeleteButton from "./DeleteButton";

type SortConfig = {
  key: keyof Course;
  direction: "ascending" | "descending";
};

export default function CourseTable({
  className,
  courses,
  allowEdit = false,
}: {
  className?: string;
  courses: Course[];
  allowEdit?: boolean;
}) {
  const [filterInput, setFilterInput] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "start",
    direction: "ascending",
  });
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (!router.isReady) return;

    const { filter } = router.query;

    if (typeof filter !== "string") return;

    setFilterInput(filter);
  }, [router.isReady]);

  useEffect(() => {
    if (filterInput === "") {
      router.push(router.pathname, undefined, {
        shallow: true,
      });
    } else {
      router.push(`${router.route}?filter=${filterInput}`, undefined, {
        shallow: true,
      });
    }
  }, [filterInput]);

  const sortedAndFilteredCourses = useMemo(() => {
    const filteredCourses = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(filterInput.toLowerCase()) ||
        course.institution.toLowerCase().includes(filterInput.toLowerCase()) ||
        course.location?.toLowerCase().includes(filterInput.toLowerCase()) ||
        course.lecturer?.toLowerCase().includes(filterInput.toLowerCase())
    );

    return filteredCourses.sort((a, b) => {
      let firstValue = a[sortConfig.key]!;
      let secondValue = b[sortConfig.key]!;

      if (typeof firstValue === "string" && typeof secondValue === "string") {
        firstValue = firstValue.toLowerCase().replaceAll(" ", "");
        secondValue = secondValue.toLowerCase().replaceAll(" ", "");
      }

      if (firstValue > secondValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }

      if (firstValue < secondValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }

      return 0;
    });
  }, [courses, sortConfig, filterInput]);

  function sortBy(key: keyof Course) {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    setSortConfig({ key, direction });
  }

  async function deleteCourse(course: Course) {
    await fetch(`/api/courses/${course.id}`, {
      method: "DELETE",
    });
    router.reload();
  }

  function TableHeader({ name }: { name: keyof Course }) {
    const [isHover, setHover] = useState(false);

    function getSortIconClassFor(key: keyof Course) {
      if (sortConfig.key !== key) {
        if (!isHover) {
          return "invisible";
        }
        return "";
      }

      return sortConfig.direction === "descending" && "rotate-180";
    }

    return (
      <th
        onClick={() => sortBy(name)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={`transform inline-block ${getSortIconClassFor(name)}`}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 10l4 4H8z" />
        </svg>
      </th>
    );
  }

  return (
    <div className={`flex flex-col gap-6 mb-8 ${className}`}>
      <div className="flex flex-row justify-between">
        <input
          placeholder="Filter by name, institution or location"
          className="w-full border border-gray-400 w-100 md:w-96 rounded px-1 focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
          type="text"
          value={filterInput}
          onChange={(event) => {
            setFilterInput(event.target.value);
          }}
        />
        <a
          href="https://www.producthunt.com/posts/coursehub?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-coursehub"
          target="_blank"
          className="hidden md:block"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=313178&theme=light"
            alt="CourseHub - Spend less time searching, more time researching. | Product Hunt"
            width="250"
            height="54"
          />
        </a>
      </div>
      <div className={`flex flex-col`}>
        <div className="-my-2 overflow-x-scroll sm:-mx-6 md:-mx-8 md:overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="relative pl-6 pr-2 py-3 md:px-6">
                      <span className="sr-only">Visit</span>
                      {allowEdit ? (
                        <>
                          <span className="sr-only">Edit</span>
                          <span className="sr-only">Delete</span>
                        </>
                      ) : null}
                    </th>
                    <TableHeader name="name" />
                    <TableHeader name="institution" />
                    <TableHeader name="start" />
                    <TableHeader name="end" />
                    <TableHeader name="location" />
                    <TableHeader name="fee" />
                    <TableHeader name="credits" />
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Visit</span>
                      {allowEdit ? (
                        <>
                          <span className="sr-only">Edit</span>
                          <span className="sr-only">Delete</span>
                        </>
                      ) : null}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredCourses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={index % 2 !== 0 ? "bg-gray-50" : ""}
                    >
                      <td className="pl-6 pr-2 py-4 whitespace-nowrap text-right text-sm font-medium md:px-6">
                        <Link href={course.link} passHref>
                          <ButtonStyle>
                            <a
                              className="mr-2"
                              onClick={() => {
                                if (session) {
                                  return;
                                }

                                fetch("/api/course_clicks", {
                                  method: "POST",
                                  body: JSON.stringify({ courseId: course.id }),
                                });
                              }}
                              target="_blank"
                              rel="noopener"
                            >
                              Visit
                            </a>
                          </ButtonStyle>
                        </Link>

                        {allowEdit ? (
                          <>
                            <Link
                              href={`/user/courses/edit/${course.id}`}
                              passHref
                            >
                              <ButtonStyle>
                                <a className="mr-2">Edit</a>
                              </ButtonStyle>
                            </Link>
                            <DeleteButton
                              onDelete={() => deleteCourse(course)}
                            />
                          </>
                        ) : null}
                      </td>
                      <td className="pl-2 pr-6 py-4 md:px-6">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 truncate max-w-md">
                              {course.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-md">
                              {course.lecturer}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {course.institution}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {dayjs(course.start).format("DD MMM YYYY")}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {dayjs(course.end).format("DD MMM YYYY")}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-md">
                        {course.location}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {course.fee !== null ? course.fee + "€" : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {course.credits !== null ? course.credits : "-"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={course.link} passHref>
                          <ButtonStyle>
                            <a
                              className="mr-2"
                              onClick={() => {
                                if (session) {
                                  return;
                                }

                                fetch("/api/course_clicks", {
                                  method: "POST",
                                  body: JSON.stringify({ courseId: course.id }),
                                });
                              }}
                              target="_blank"
                              rel="noopener"
                            >
                              Visit
                            </a>
                          </ButtonStyle>
                        </Link>

                        {allowEdit ? (
                          <>
                            <Link
                              href={`/user/courses/edit/${course.id}`}
                              passHref
                            >
                              <ButtonStyle>
                                <a className="mr-2">Edit</a>
                              </ButtonStyle>
                            </Link>
                            <DeleteButton
                              onDelete={() => deleteCourse(course)}
                            />
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
