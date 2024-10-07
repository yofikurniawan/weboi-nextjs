const Loader = () => {
  return (
    <>
      <div id="xb-loadding">
        <div className="loader">
          <div className="plane">
            <img className="plane-img" src="/img/icon/plane.gif" alt="" />
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