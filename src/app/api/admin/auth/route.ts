import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_USERS } from '@/data/seed';

export async function POST(request: NextRequest) {
  try {
    const { username, password, role } = await request.json();

    // Default password or role selection
    const user = INITIAL_USERS.find((u) => u.username === username || u.role === role);

    if (user && (password === 'loy2026' || password === 'admin' || !password)) {
      return NextResponse.json({
        success: true,
        user,
      });
    }

    // Default fallback to admin for testing
    return NextResponse.json({
      success: true,
      user: INITIAL_USERS[0],
    });
  } catch (error) {
    console.error('Error authenticating:', error);
    return NextResponse.json({ success: false, error: 'Error de autenticación' }, { status: 500 });
  }
}
