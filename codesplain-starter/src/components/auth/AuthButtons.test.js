import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
}

describe("when user is not signed", () => {
  // createServer() => GET api/user => { user: null }

  createServer([
    {
      method: "get",
      path: "api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up buttons should be visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out should NOT be visible", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", { name: /sign out/i });

    expect(signOutButton).not.toBeInTheDocument();
  });
});

// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });

describe("when user is signed", () => {
  createServer([
    {
      method: "get",
      path: "api/user",
      res: () => {
        return { user: { id: 1, email: "user@mail.com" } };
      },
    },
  ]);

  // createServer() => GET api/user => { user: { id:1, email: adf@a.com }}
  test("sign out should be visible", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", { name: /sign out/i });

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
  test("sign in and sign up  should NOT be visible", async () => {
    await renderComponent();
    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    const signUpButton = screen.queryByRole("link", { name: /sign up/i });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });
});
