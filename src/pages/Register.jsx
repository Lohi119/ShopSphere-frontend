import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      console.log("Registration successful:", data);

      setSuccess("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5 }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Register
      </Typography>

      {error && (
        <Typography
          color="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}

      {success && (
        <Typography
          color="success.main"
          sx={{ mb: 2 }}
        >
          {success}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </Button>
      </form>
    </Container>
  );
}

export default Register;
