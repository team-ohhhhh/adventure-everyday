import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import styles from "./AdventureDetailPage.module.css";
function AdventureDetailPage() {
  let { id } = useParams();
  console.log("ad detail page");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.white}>
          <AdventureInfo info={id}></AdventureInfo>
        </div>
        <div className={styles.purple}></div>
      </div>
    </>
  );
}
export default AdventureDetailPage;
