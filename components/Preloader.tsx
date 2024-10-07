import Image from "next/image";

const Preloader = () => {
  return (
    <>
      <div id="xb-loadding">
        <div className="loader">
          <div className="plane">
            <Image src="/img/icon/plane.gif" alt="" width={350} height={350} />
          </div>
          <div className="earth-wrapper">
            <div className="earth" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
