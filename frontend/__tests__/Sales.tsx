import { render, screen, waitFor } from "@testing-library/react";
import Sales from "@/app/sales/page";
import { getTransactions } from "@/services/transactions/getTransactions";

jest.mock("@/services/transactions/getTransactions");
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname: () => () => "localhost:3000/sales",
}));
describe("Sales Component", () => {
  it("should display transactions if data is fetched successfully", async () => {
    const mockTransactions = [
      {
        id: 1,
        type: 1,
        date: "2024-12-01",
        product: "Produto A",
        value: 100,
        seller: "Vendedor A",
      },
      {
        id: 2,
        type: 2,
        date: "2024-12-02",
        product: "Produto B",
        value: 150,
        seller: "Vendedor B",
      },
    ];
    getTransactions.mockResolvedValue(mockTransactions);

    render(<Sales />);

    await waitFor(() => {
      expect(screen.getByText("Produto A")).toBeInTheDocument();
      expect(screen.getByText("Produto B")).toBeInTheDocument();
    });

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
  });

  it("should display a message if no transactions are returned", async () => {
    getTransactions.mockResolvedValue([]);

    render(<Sales />);

    await waitFor(() => {
      const rows = screen.queryAllByRole("row");
      expect(rows.length).toBe(1);
    });
  });
});
