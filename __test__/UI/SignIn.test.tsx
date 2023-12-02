import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignInForm from "@/app/components/SignInForm";
import { useRouter } from "next/navigation";


jest.mock("next/navigation");

describe("SignInForm render test", () => {
    it("renders a sign in form", () => {
        const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
        render(<SignInForm />);
        expect(screen.getByText("Sign In")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("mail@example.com")).toBeInTheDocument();
    });
});