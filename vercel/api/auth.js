export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ensure body is parsed and password is provided
  if (!req.body || typeof req.body !== 'object' || !req.body.password) {
    res.setHeader(
      'Set-Cookie',
      'auth=; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    );
    return res.status(400).json({ error: 'Password is required' });
  }

  const submittedPassword = req.body.password;
  const correctPassword = process.env.AUTH_PASSWORD;

  // Check if auth cookie exists
  const authCookie = req.headers.cookie
    ?.split('; ')
    .find((row) => row.startsWith('auth='));
  const isAuthenticated = authCookie && authCookie.split('=')[1] === 'valid';

  if (submittedPassword === correctPassword) {
    // Set or refresh cookie on correct password
    res.setHeader(
      'Set-Cookie',
      'auth=valid; HttpOnly; Secure; SameSite=Strict; Max-Age=3600'
    );
    return res.status(200).json({ message: 'Authenticated' });
  } else if (isAuthenticated) {
    // Allow if already authenticated, but don’t refresh cookie
    return res.status(200).json({ message: 'Authenticated' });
  } else {
    // Clear cookie and deny access on incorrect/empty password
    res.setHeader(
      'Set-Cookie',
      'auth=; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    );
    return res.status(401).json({ error: 'Incorrect password' });
  }
}
