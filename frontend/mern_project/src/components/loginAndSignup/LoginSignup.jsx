import React, { useState } from 'react';
import './loginSignup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const LoginSignup = () => {
    const [formState, setFormState] = useState("signup");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', { // Ensure the endpoint matches your server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('authToken', data.token); // Use a meaningful key name
                window.location.replace("/"); // Navigate to home page on successful login
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const signUp = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/signup', { // Ensure the endpoint matches your server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone_number: formData.phoneNumber,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Signup successful');
                setFormState('login'); // Switch to login form after successful signup
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="form">
            <div className="form-container">
                <h1>{formState === "signup" ? "Sign Up" : "Login"}</h1>
                <form>
                    {formState === "signup" && (
                        <>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel" // Changed to `tel` for phone input
                                        placeholder="Enter Phone No"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Row>
                        </>
                    )}

                    {formState === "login" && (
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                    )}

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {formState === "signup" && (
                            <Form.Group as={Col} controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        )}
                    </Row>

                    <Button
                        variant="outline-dark"
                        onClick={(e) => {
                            e.preventDefault();
                            formState === "signup" ? signUp() : login();
                        }}
                    >
                        {formState === "signup" ? "Sign Up" : "Login"}
                    </Button>

                    <Button
                        variant="link"
                        onClick={() => setFormState(formState === "signup" ? "login" : "signup")}
                    >
                        {formState === "signup" ? "Switch to Login" : "Switch to Sign Up"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginSignup;
