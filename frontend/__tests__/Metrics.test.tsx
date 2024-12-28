import { render, screen, act } from "@testing-library/react";
import useTransactions from "@/hooks/useTransactions";
import { getTransactions } from "@/services/transactions/getTransactions";

jest.mock("@/services/transactions/getTransactions", () => ({
  getTransactions: jest.fn(),
}));

const TestComponent = () => {
  const { metrics, error } = useTransactions();

  if (metrics) {
    return (
      <div>
        {Object.keys(metrics).map((key) => (
          <div key={key}>{key}</div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Carregando...</div>;
};

describe("useTransactions", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should display 'Carregando...' while the request is being made", async () => {
    act(() => {
      render(<TestComponent />);
    });

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should display the metrics correctly when the request is successful", async () => {
    const mockTransactions = [
      {
        value: 1000,
        product: "DESENVOLVEDOR FULL STACK",
        type: 1,
        seller: "ELIANA NOGUEIRA",
      },
      {
        value: 1500,
        product: "DESENVOLVEDOR FULL STACK",
        type: 2,
        seller: "JOÃO SILVA",
      },
      {
        value: 500,
        product: "CURSO DE BEM-ESTAR",
        type: 1,
        seller: "ELIANA NOGUEIRA",
      },
      {
        value: 2000,
        product: "DOMINANDO INVESTIMENTOS",
        type: 3,
        seller: "MARIA SILVA",
      },
    ];

    (getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

    await act(async () => {
      render(<TestComponent />);
    });

    expect(await screen.findByText("commissionPaid")).toBeInTheDocument();
  });

  it("should handle errors when fetching transactions", async () => {
    (getTransactions as jest.Mock).mockRejectedValue(
      new Error("Erro ao buscar dados")
    );

    await act(async () => {
      render(<TestComponent />);
    });

    expect(
      await screen.findByText(
        "Erro ao buscar os dados. Tente novamente mais tarde."
      )
    ).toBeInTheDocument();
  });
});
