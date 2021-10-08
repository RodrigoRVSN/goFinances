import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./AuthContext";

describe("Auth Hook", () => {
  it("Should sign in with google account existing", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
});
