export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const submittedPassword = req.body?.password;
  const correctPassword = process.env.AUTH_PASSWORD;

  if (submittedPassword === correctPassword) {
    // Set a secure cookie
    res.setHeader(
      'Set-Cookie',
      'auth=valid; HttpOnly; Secure; SameSite=Strict; Max-Age=3600'
    );
    return res.status(200).json({ message: 'Authenticated' });
  } else {
    return res.status(401).json({ error: 'Incorrect password' });
  }
}
