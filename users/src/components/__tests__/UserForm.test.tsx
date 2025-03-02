import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import UserForm from "../UserForm";
import userEvent from "@testing-library/user-event";

test("it should show two inputs and button", () => {
  // render the component
  render(<UserForm onUserAdd={() => {}} />);

  // Manipulate the component or find the element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it should call onUserAdd when the form is submit", async () => {
  const mock = vi.fn();

  render(<UserForm onUserAdd={mock} />);

  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  await userEvent.click(nameInput);
  await userEvent.keyboard("test");

  await userEvent.click(emailInput);
  await userEvent.keyboard("test@test.com");

  const button = screen.getByRole("button");
  await userEvent.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "test", email: "test@test.com" });
});
