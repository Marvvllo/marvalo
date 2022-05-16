import SidebarItem from "./SidebarItem";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// JSX Templates for mapping the agents
const mapAgent = (agent) => <SidebarItem agent={agent} />;

const Sidebar = ({ agents }) => {
  const { asPath } = useRouter();
  // sort agents by their roles
  const controllers = agents.filter(({ role }) => {
    return role.displayName === "Controller";
  });

  const duelists = agents.filter(({ role }) => {
    return role.displayName === "Duelist";
  });

  const initiators = agents.filter(({ role }) => {
    return role.displayName === "Initiator";
  });

  const sentinels = agents.filter(({ role }) => {
    return role.displayName === "Sentinel";
  });

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
        {asPath == "/roles/controller" ? (
          <li>
            <Link href={"/roles/controller"}>
              <a className={`${styles.item} ${styles.active}`}>
                <Image
                  src={require("../images/ic_controller.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={"/roles/controller"}>
              <a className={styles.item}>
                <Image
                  src={require("../images/ic_controller.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        )}
        {controllers.map(mapAgent)}
        {asPath == "/roles/duelist" ? (
          <li>
            <Link href={"/roles/duelist"}>
              <a className={`${styles.item} ${styles.active}`}>
                <Image
                  src={require("../images/ic_duelist.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={"/roles/duelist"}>
              <a className={styles.item}>
                <Image
                  src={require("../images/ic_duelist.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        )}
        {duelists.map(mapAgent)}
        {asPath == "/roles/initiator" ? (
          <li>
            <Link href={"/roles/initiator"}>
              <a className={`${styles.item} ${styles.active}`}>
                <Image
                  src={require("../images/ic_initiator.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={"/roles/initiator"}>
              <a className={styles.item}>
                <Image
                  src={require("../images/ic_initiator.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        )}
        {initiators.map(mapAgent)}
        {asPath == "/roles/sentinel" ? (
          <li>
            <Link href={"/roles/sentinel"}>
              <a className={`${styles.item} ${styles.active}`}>
                <Image
                  src={require("../images/ic_duelist.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={"/roles/sentinel"}>
              <a className={styles.item}>
                <Image
                  src={require("../images/ic_sentinel.png")}
                  width={500}
                  height={500}
                />
              </a>
            </Link>
          </li>
        )}
        {sentinels.map(mapAgent)}
      </ul>
    </div>
  );
};

export default Sidebar;
