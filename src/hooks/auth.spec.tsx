import "jest-fetch-mock";

import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "./AuthContext";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-auth-session");

//Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();

describe("Hook de autenticação", () => {
  it("should be able to sign in with Google account existing", async () => {
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    //Agora que temos o Token, vamos mockar a requisição ttp dos dados de profile do usuário.
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "any_id",
        email: "rodrigo.goncalves@rocketseat.team",
        name: "Rodrigo",
        photo: "any_photo.png",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());
    await waitForNextUpdate();

    // Você até pode usar esse console.log para visualizar os dados.
    console.log("USER PROFILE =>", result.current.user);

    expect(result.current.user.email).toBe("rodrigo.goncalves@rocketseat.team");
    expect(result.current.user).toHaveProperty("id");
  });

  it("should not connect id when cancel", async () => {
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());
    await waitForNextUpdate();

    // Você até pode usar esse console.log para visualizar os dados.
    console.log("USER PROFILE =>", result.current.user);

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should have error with incorrect parameters", async () => {
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(async () => await result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
    await waitForNextUpdate();
  });
});
