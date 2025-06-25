const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const {
    first_name,
    last_name,
    user_email,
    address,
    city,
    state,
    zip_code,
    items, // string list (already formatted on frontend)
    total,
  } = JSON.parse(event.body);

  const message = `Pedido de ${first_name} ${last_name}\n\n${items}\n\nDirección:\n${address}\n${city}, ${state} ${zip_code}\n\nTotal: $${total}`;

  const msg = {
    personalizations: [
      {
        to: [{ email: user_email }],
        subject: "Gracias por tu pedido - Hailie Cosmetics",
      },
      {
        to: [{ email: "orders@hailiecosmetics.com" }],
        subject: "Nuevo Pedido Recibido",
      },
    ],
    from: { email: "orders@hailiecosmetics.com" },
    content: [
      {
        type: "text/plain",
        value: message,
      },
    ],
  };

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "SendGrid error", details: errorText }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails sent successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
};
