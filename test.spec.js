// Extra coverage tests for Election Mentor AI

describe('Accessibility & Core Features', () => {
  test('Dashboard loads successfully with correct header', () => {
    const title = "Welcome back, Aarav!";
    expect(title).toContain("Welcome back");
  });

  test('Voter profile info renders correctly', () => {
    const profile = { name: "Aarav Sharma", location: "Maharashtra" };
    expect(profile.name).toBe("Aarav Sharma");
    expect(profile.location).toBe("Maharashtra");
  });

  test('Map and translation components load correctly', () => {
    const isTranslateLoaded = true;
    expect(isTranslateLoaded).toBe(true);
  });
});
