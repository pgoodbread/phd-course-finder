import { Course } from ".prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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
    key: "date",
    direction: "ascending",
  });
  const router = useRouter();

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
        course.location?.toLowerCase().includes(filterInput.toLowerCase())
    );

    return filteredCourses.sort((a, b) => {
      if (a[sortConfig.key]! < b[sortConfig.key]!) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key]! > b[sortConfig.key]!) {
        return sortConfig.direction === "ascending" ? 1 : -1;
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
    fetch(`/api/courses/${course.id}`, {
      method: "DELETE",
    });
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
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={`transform inline-block hover:opacity-100 ${getSortIconClassFor(
            name
          )}`}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 10l4 4H8z" />
        </svg>
      </th>
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <input
        placeholder="Filter by name, institution and location"
        className="border border-gray-400 w-60 rounded px-1"
        type="text"
        value={filterInput}
        onChange={(event) => {
          setFilterInput(event.target.value);
        }}
      />
      <div className={`flex flex-col`}>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader name="name" />
                    <TableHeader name="institution" />
                    <TableHeader name="date" />
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
                  {sortedAndFilteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {course.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {course.lecturer}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.institution}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.date.toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.location}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.fee} €
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.credits}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={course.link}
                          target="_blank"
                          className="bg-primary  hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded mr-4"
                        >
                          Visit
                        </a>
                        {allowEdit ? (
                          <>
                            <Link href={`/courses/edit/${course.id}`}>
                              <a className="bg-primary mr-4  hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded">
                                Edit
                              </a>
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
