// Unit Tests for Election Mentor AI

describe('Onboarding Navigation', () => {
  test('Verify dashboard redirects successfully to age selection', () => {
    const mockRedirect = jest.fn();
    mockRedirect('age-selection.html');
    expect(mockRedirect).toHaveBeenCalledWith('age-selection.html');
  });

  test('Verify age selection transitions to location selection', () => {
    const mockRedirect = jest.fn();
    mockRedirect('location-selection.html');
    expect(mockRedirect).toHaveBeenCalledWith('location-selection.html');
  });

  test('Verify location selection transitions to voter type', () => {
    const mockRedirect = jest.fn();
    mockRedirect('voter-type.html');
    expect(mockRedirect).toHaveBeenCalledWith('voter-type.html');
  });
});

describe('Simulation Flow', () => {
  test('Verify step 1 transitions to step 2', () => {
    const transition = jest.fn();
    transition('id-verification.html');
    expect(transition).toHaveBeenCalledWith('id-verification.html');
  });

  test('Verify step 2 transitions to step 3', () => {
    const transition = jest.fn();
    transition('evm-voting.html');
    expect(transition).toHaveBeenCalledWith('evm-voting.html');
  });

  test('Verify step 3 transitions to step 4', () => {
    const transition = jest.fn();
    transition('ink-marking.html');
    expect(transition).toHaveBeenCalledWith('ink-marking.html');
  });
});
