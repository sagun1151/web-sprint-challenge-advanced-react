import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render (<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
    render (<CheckoutForm />);

    const firstName = screen.getByLabelText(/first name:/i);
    const lastName = screen.getByLabelText(/last name:/i);
    const address = screen.getByLabelText(/address:/i);
    const city = screen.getByLabelText(/city:/i);
    const state = screen.getByLabelText(/state:/i);
    const zip = screen.getByLabelText(/zip:/i);
    const button = screen.getByRole('button');

    userEvent.type(firstName, 'sagun');
    userEvent.type(lastName, 'shrestha');
    userEvent.type(address, '12345');
    userEvent.type(city, 'moon');
    userEvent.type(state, 'united');
    userEvent.type(zip, '80000');
    userEvent.click(button);

    const success = screen.queryByText(/you have ordered some plants! woo-hoo!/i);
    expect(success).toBeInTheDocument();

    const name = screen.queryByText(/sagun shrestha/i);
    expect(name).toBeInTheDocument();

    const location = screen.queryByText(/moon, united 80000/i);
    expect(location).toBeInTheDocument();
});
