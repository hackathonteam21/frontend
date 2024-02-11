import { useState } from "react";

import AddressManager from "@/AddressManager.tsx";
import { PointMap } from "@/search/point-map.tsx";

import styles from "./search.module.scss";

const SearchPage = () => {
  const [center] = useState({ lat: 35.6812362, lng: 139.7645445 });
  return (
    <div className={styles.wrapper}>
      <PointMap center={center} />
      <aside className={styles.aside}>
        <AddressManager />
      </aside>
    </div>
  );
};

export { SearchPage };
