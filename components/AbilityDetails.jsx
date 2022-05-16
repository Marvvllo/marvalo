import styles from "../styles/AbilityDetails.module.css";

const AbilityDetails = ({ abilities, abilitySlot }) => {
  let currentAbility;
  let abilityKey;
  currentAbility = abilities.find(
    (ability) => ability.slot == abilitySlot
  );
  switch (currentAbility.slot) {
    case "Ability1":
      abilityKey = "Q - ";
      break;
    case "Ability2":
      abilityKey = "E - ";
      break;
    case "Grenade":
      abilityKey = "C - ";
      break;
    case "Ultimate":
      abilityKey = "X - ";
      break;
  }
  return (
    <div className={styles.abilityDetail}>
      <h3 className={styles.abilityName}>
        {abilityKey + currentAbility.displayName}
      </h3>
      <p className={styles.abilityDesc}>
        {currentAbility.description}
      </p>
    </div>
  );
};

export default AbilityDetails;
