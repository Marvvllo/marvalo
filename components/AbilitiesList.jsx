import styles from "../styles/AbilitiesList.module.css";
import Image from "next/image";

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
