import styles from "../styles/AbilitiesList.module.css";
import Image from "next/image";
import { v4 as uuid } from "uuid";

const AbilitiesList = ({
  abilities,
  abilitySlot,
  setAbilitySlot,
}) => {
  const abilityClickHandler = (abilityClicked) => {
    setAbilitySlot(abilityClicked);
  };
  return (
    <div className={styles.abilitiesList}>
      {abilities.map((ability) => {
        if (abilitySlot == ability.slot) {
          return (
            <div
              onClick={() => abilityClickHandler(ability.slot)}
              className={`${styles.ability} ${styles.active}`}
              key={uuid()}
            >
              <Image
                src={ability.displayIcon}
                width={120}
                height={120}
              />
            </div>
          );
        }
        return (
          <div
            onClick={() => abilityClickHandler(ability.slot)}
            className={styles.ability}
            key={uuid()}
          >
            <Image
              src={ability.displayIcon}
              width={120}
              height={120}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AbilitiesList;
