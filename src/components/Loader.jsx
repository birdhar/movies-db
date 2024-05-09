import style from "../styles/Loader.module.css";

function Loader() {
  return (
    <div className={style.loadercontainer}>
      <div className={style.spinner}></div>
    </div>
  );
}

export default Loader;
