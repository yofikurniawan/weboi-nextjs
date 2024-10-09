import Image from "next/image";

type Breadcrumb = {
  title: string;
  url?: string;
};

type BreadcrumbProps = {
  breadcrumbData: Breadcrumb[];
};

const Breadcrumb = ({ breadcrumbData }: BreadcrumbProps) => {
  return (
    <section
      className="breadcrumb pos-rel bg_img"
      style={{ backgroundImage: "url(/images/web/breadcrumb.png)" }}
    >
      <div className="container">
        <div className="breadcrumb__content">
          {/* Title Breadcrumb */}
          <h2
            className="breadcrumb__title "
            style={{ textShadow: "2px 4px 4px #ffffff" }}
          >
            {breadcrumbData[breadcrumbData.length - 1]?.title || "Page Title"}
          </h2>

          {/* List Breadcrumb */}
          <ul className="breadcrumb__list clearfix">
            {breadcrumbData.map((item, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === breadcrumbData.length - 1 ? "active" : ""
                }`}
              >
                {item.url ? (
                  <a href={item.url}>{item.title}</a>
                ) : (
                  <span>{item.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="breadcrumb__circle">
        <span className="big" data-parallax='{"y" : 100, "scale" : 0.1}' />
        <span className="small" data-parallax='{"y" : 100, "scale" : 0.1}' />
      </div>
      <div className="breadcrumb__shape">
        <div className="shape shape--1">
          <div className="shape-inner" data-parallax='{"x":-50,"y":80}'>
            <Image
              src="/images/shape/br_shape1.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="shape shape--2">
          <div className="shape-inner" data-parallax='{"x":50,"y":-90}'>
            <Image
              src="/images/shape/br_shape2.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
