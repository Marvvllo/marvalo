import SidebarItem from "../components/SidebarItem";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";

// JSX Templates for mapping the agents
const mapAgent = (agent) => <SidebarItem agent={agent} />;

const Sidebar = ({
  controllers,
  duelists,
  initiators,
  sentinels,
}) => {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <a className={styles.logo}>
          <Image
            src={require("../images/logo.png")}
            width={500}
            height={250}
          />
        </a>
      </Link>
      <ul className={styles.list}>
        <li>
          <Link href={"/role/controller"}>
            <a className={styles.item}>
              <Image
                src={require("../images/ic_controller.png")}
                width={500}
                height={500}
              />
            </a>
          </Link>
        </li>
        {controllers.map(mapAgent)}
        <li>
          <Link href={"/role/duelist"}>
            <a className={styles.item}>
              <Image
                src={require("../images/ic_duelist.png")}
                width={500}
                height={500}
              />
            </a>
          </Link>
        </li>
        {duelists.map(mapAgent)}
        <li>
          <Link href={"/role/initiator"}>
            <a className={styles.item}>
              <Image
                src={require("../images/ic_initiator.png")}
                width={500}
                height={500}
              />
            </a>
          </Link>
        </li>
        {initiators.map(mapAgent)}
        <li>
          <Link href={"/role/sentinel"}>
            <a className={styles.item}>
              <Image
                src={require("../images/ic_sentinel.png")}
                width={500}
                height={500}
              />
            </a>
          </Link>
        </li>
        {sentinels.map(mapAgent)}
      </ul>
    </div>
  );
};

export default Sidebar;
