import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignOutButton from "@/app/components/SignOutButton";

describe("Membership render test", () => {
    it("renders a membership card", () => {
        render(<SignOutButton />);
        expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });
});