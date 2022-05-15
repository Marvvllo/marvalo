import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SidebarItem = ({ agent }) => {
  const { asPath } = useRouter();
  useEffect(() => {
    console.log(asPath);
  }, []);

  if (asPath == "/agents/" + agent.uuid) {
    return (
      <li>
        <Link href={"/agents/" + agent.uuid} key={agent.uuid}>
          <a className={`${styles.item} ${styles.active}`}>
            <Image src={agent.displayIcon} width={500} height={500} />
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link href={"/agents/" + agent.uuid} key={agent.uuid}>
        <a className={styles.item}>
          <Image src={agent.displayIcon} width={500} height={500} />
        </a>
      </Link>
    </li>
  );
};

export default SidebarItem;
