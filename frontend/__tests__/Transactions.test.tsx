import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewTransactions from "@/app/send-transactions/page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname: () => () => "localhost:3000/send-transactions",
}));

describe("NewTransactions", () => {
  it("should display an error message when trying to send without a file", async () => {
    render(<NewTransactions />);

    const submitButton = screen.getByRole("button", { name: /Enviar/i });

    expect(screen.queryByText(/É necessário anexar um documento para prosseguir com a requisição./i)).toBeNull();

    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/É necessário anexar um documento para prosseguir com a requisição./i);

    expect(errorMessage).toBeInTheDocument();
  });
});
