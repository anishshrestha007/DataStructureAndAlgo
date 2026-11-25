export default function reducer(state, action) {
  switch (action.type) {
    case "personal":
      state.personalInformation = action.data;
      return state;
    case "experience":
      state.experienceList = action.data;
      return state;
    case "education":
      state.educationList = action.data;
      return state;
    default:
      return state;
  }
}
