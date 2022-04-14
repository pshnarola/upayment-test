import React from 'react';
import { shallow, mount } from 'enzyme';
import NewProduct from './NewProduct';
import { BrowserRouter } from 'react-router-dom';
import { at } from 'lodash';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const mockProductData = {
    description: "Lorem ipsum may be used as a placeholder before final copy is availableLorem ipsum may be used as a placeholder before final copy is availableLorem ipsum may be used as a placeholder before final copy is available",
    price: 100,
    name: "Iphone X",
    avatar: "https://picsum.photos/seed/picsum/200",
    category: "mens-clothing",
}

const {
    description,
    price,
    name,
    avatar,
    category } = mockProductData
describe('add Product test', () => {
    test('add Product test', () => {
        render(
            <BrowserRouter>
                <NewProduct />
            </BrowserRouter>
        );
        expect(screen.getByText(/Create Product/i)).toBeInTheDocument();
    });
    test('click on submit button', async () => {

        render(
            <BrowserRouter>
                <NewProduct />
            </BrowserRouter>
        );

        screen.getByTestId('pname').value = name;
        screen.getByTestId('description').value = description;
        screen.getByTestId('price').value = price;
        screen.getByTestId('category').value = category;
        screen.getByTestId('avatar').value = avatar;

        const SignupBtn = screen.getByTestId('submit-button');
        SignupBtn.click();

    });
});




