export default function Temporary() {
  function showPolicy() {
    const policywnd = window.open(
      "http://www.parkingcrew.net/privacy.html",
      "pcrew_policy",
      "width=890,height=330,left=200,top=200,menubar=no,status=yes,toolbar=no"
    );
    policywnd?.focus();
  }

  return (
    <>
      <head id="ctl00_ctl00_Head1">
        <title>coursehub.app - Registered at Namecheap.com</title>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link
          href="http://i.cdnpark.com/themes/assets/style.css"
          rel="stylesheet"
          type="text/css"
          media="screen"
        />
        <link
          href="http://i.cdnpark.com/themes/registrar/style_namecheap.css"
          rel="stylesheet"
          type="text/css"
          media="screen"
        />
        <meta name="Generator" content="Sitefinity 3.7.2136.240:1" />
      </head>
      <body>
        <form
          name="aspnetForm"
          method="post"
          action="./registered.aspx"
          id="aspnetForm"
        >
          <div>
            <input
              type="hidden"
              name="__VIEWSTATE"
              id="__VIEWSTATE"
              value="/wEPDwUENTM4MWRkh+NoXy57m7zZLMYTEbqgM3NfLvg720RAgdQYMLaB+i0="
            />
          </div>

          <div>
            <input
              type="hidden"
              name="__VIEWSTATEGENERATOR"
              id="__VIEWSTATEGENERATOR"
              value="15E68AF1"
            />
          </div>

          <div id="wrapper">
            <div id="twoclick" style={{ display: "none" }}>
              <div id="holder">
                <div id="header">
                  <div className="width">
                    <div id="logo">
                      <p>
                        This domain is registered at
                        <span id="regName"> Namecheap</span>
                        <br />
                        <a href="//www.namecheap.com/?utm_source=parkingpage&utm_medium=referral&utm_campaign=parkingpage">
                          <img
                            src="http://i.cdnpark.com/themes/registrar/images/logo_namecheap.png"
                            alt="Namecheap"
                          />
                        </a>
                        <br />
                        <span id="ctl00_ctl00_base_content_registeredOrExpiredText_Two">
                          This domain was recently registered at Namecheap.
                          Please check back later!
                        </span>
                        .
                      </p>
                    </div>
                    <h1 id="domaintitle">
                      <a href="#">coursehub.app</a>
                    </h1>
                  </div>
                </div>
                <div id="main" className="width">
                  <div className="content">
                    <div id="tc_holder1" className="tcblock"></div>
                    <div className="fix"></div>
                  </div>
                  <div id="form"></div>
                </div>
              </div>
            </div>

            <div id="oneclick" style={{ display: "none" }}>
              <div id="header">
                <div className="width">
                  <div id="logo">
                    <p>
                      This domain is registered at
                      <span id="regName"> Namecheap</span>
                      <br />
                      <a
                        href="javascript:void(0);"
                        data-href="https://www.namecheap.com/?utm_source=parkingpage&utm_medium=referral&utm_campaign=parkingpage"
                        onClick={function (this: any) {
                          //ts-ignore
                          window.open(this.getAttribute("data-href"));
                          return false;
                        }}
                        rel="noindex,nofollow"
                      >
                        <img src="http://i.cdnpark.com/themes/registrar/images/logo_namecheap.png" />
                      </a>
                      <br />
                      <span id="ctl00_ctl00_base_content_registeredOrExpiredText_One">
                        This domain was recently registered at Namecheap. Please
                        check back later!
                      </span>
                      .
                    </p>
                  </div>
                  <h1 id="domaintitle">
                    <a href="#">coursehub.app</a>
                  </h1>
                </div>
              </div>
              <div id="main" className="width">
                <div id="ads"></div>
                <div id="sidebar"></div>
                <div className="fix"></div>
                <div id="form"></div>
              </div>
            </div>
          </div>

          <div id="footer" className="width">
            2021 Copyright. All Rights Reserved. <br />
            <br />
            The Sponsored Listings displayed above are served automatically by a
            third party. Neither Parkingcrew nor the domain owner maintain any
            relationship with the advertisers.
            <br />
            <br />
            <a
              onClick={() => showPolicy()}
              className="underline"
              href="javascript:void(0);"
            >
              Privacy Policy
            </a>
          </div>

          <div className="trackingcontainer"></div>
        </form>
        <form id="clientForm" action=""></form>
      </body>
    </>
  );
}
