import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("Home Component", () => {
  it('should displays "Loading..." on initial render', () => {
    render(<Home />);

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });
});
