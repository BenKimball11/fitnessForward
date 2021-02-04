export const MoodFilter = () => {
    return `
    <fieldset class="fieldset">
          <legend>Filter Entries by Mood</legend>
          <div><input type="radio" name="moodFilter" id="moodEnthusiastic" value="enthusiastic">
          <label for="moodEnthusiastic">Enthusiastic</label></div>
          <div>
            <input type="radio" name="moodFilter" value="sweaty" id="moodSweaty">
            <label for="moodSweaty">Sweaty</label>
          </div>
          <div>
            <input type="radio" name="moodFilter" value="terrified" id="moodTerrified">
            <label for="moodTerrified">Terrified</label>
          </div>
          <div>
            <input type="radio" name="moodFilter" value="all" id="allMoods">
            <label for="allMoods">All Moods</label>
          </div>
        </fieldset>  
    `;
  };