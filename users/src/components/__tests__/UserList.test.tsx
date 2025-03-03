import { render, screen, within } from "@testing-library/react";
import UserList from "../UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  render(<UserList users={users} />);

  return { users };
}

test("should render one row per user", () => {
  renderComponent();

  // Another approach to finding element
  // const { container } = render(<UserList users={users} />);
  // const rows = container.querySelectorAll("tbody tr");

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("should render the email and name of the user", () => {
  const { users } = renderComponent();

  for (const user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
