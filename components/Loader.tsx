import Image from 'next/image';

const Loader = () => {
  return (
    <>
      <div id="xb-loadding">
        <div className="loader">
          <div className="plane">
            <Image className="plane-img" src="/images/icon/plane.gif" alt="" 
              width={100} height={100}
            />
          </div>
          <div className="earth-wrapper">
            <div className="earth" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;