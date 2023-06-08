import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FormFeedback, FormGroup, Input, Label, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import * as Yup from "yup";

const Forms = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: false,
    terms: false,
  });
  const [formErrs, setFormErrs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: false,
    terms: false,
  });
  const [valid, setValid] = useState(false);
  const [users, setUsers] = useState([]);

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("enter your first name"),
    lastName: Yup.string().required("enter your last name"),
    email: Yup.string().required("enter a valid email address"),
    password: Yup.string().min(6, "password must be at least 6 characters").required("enter a valid password"),
    terms: Yup.boolean().required("You must agree"),
    role: Yup.string().oneOf(["frontEnd","backEnd","wordPress"])
  });

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("https://reqres.in/api/users", form)
      .then((res) => {
        setUsers([...users, res.data]);
        // setForm({});
        if (users.find(user => user.email === "waffle@syrup.com")) {
          alert('kullanici mevcut');
          return;
        }
      })
      .catch((error) => {
        console.error("error oldu", error);
      });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrs({ ...formErrs, [name]: "" });
      })
      .catch((err) => {
        setFormErrs({ ...formErrs, [name]: err.errors[0] });
      });

    setForm({ ...form, [name]: value });
  };

  const inputCheckboxHandler = (e) => {
    const { name, checked } = e.target;

    setForm({ ...form, [name]: checked });
  };

  const handleSelect = (value) => {
    setForm({ ...form, role: value });
  };

  useEffect(() => {
    formSchema.isValid(form).then((valid) => setValid(valid));
  }, [form]);

  const kullaniciSil = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <div>
      <form style={{ maxWidth: "400px", margin: "auto", marginTop: "5%", marginBottom: "40px", background: "whitesmoke", padding: "20px" }} onSubmit={submitHandler}>
        <UncontrolledDropdown group>
          <Button color="primary">
            Select a Role
          </Button>
          <DropdownToggle caret color="primary" />
          <DropdownMenu>
            <DropdownItem onClick={() => handleSelect("frontEnd")} name="frontEnd" id="frontEnd" value="frontEnd">
              Front-end Developer
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect("backEnd")} name="backEnd" id="backEnd" value="backEnd">
              Back-end Developer
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect("wordPress")} name="wordPress" id="wordPress" value="wordPress">
              WordPress Developer
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="name-section">
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName"
              onChange={inputChangeHandler}
              value={form.firstName}
              invalid={!!formErrs.firstName} />
            <FormFeedback>{formErrs.firstName}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName"
              onChange={inputChangeHandler}
              value={form.lastName}
              invalid={!!formErrs.lastName} />
            <FormFeedback>{formErrs.lastName}</FormFeedback>
          </FormGroup>
        </div>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email"
            onChange={inputChangeHandler}
            value={form.email}
            invalid={!!formErrs.email} />
          <FormFeedback>{formErrs.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password"
            onChange={inputChangeHandler}
            value={form.password}
            invalid={!!formErrs.password} />
          <FormFeedback>{formErrs.password}</FormFeedback>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input name="terms" id="terms" type="checkbox"
              onChange={inputCheckboxHandler}
              checked={form.terms}
              invalid={!!formErrs.terms} />{' '}
            I agree to Terms of Service
          </Label>
        </FormGroup>
        <FormFeedback>{formErrs.terms}</FormFeedback>
        <Button style={{ marginTop: "15px" }} disabled={!valid}>Submit</Button>
      </form>
      <h2>Eklenen Kullanicilar</h2>
      {users.map((user) => (
        <div key={user.id} onClick={() => kullaniciSil(user.id)} className="eklenenler">
          <p><b>Name & Last name:</b>{user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Forms;
