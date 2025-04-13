export const userRoles = [
    {
      id: 1,
      roleName: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123', // In real apps, NEVER store plain passwords!
      permissions: ['create', 'read', 'update', 'delete'],
      description: 'Full access to all system features and settings.'
    },
    {
      id: 2,
      roleName: 'Manager',
      email: 'manager@example.com',
      password: 'Manager@123',
      permissions: ['read', 'update', 'create'],
      description: 'Can manage users and content but cannot access system settings.'
    },
    {
      id: 3,
      roleName: 'Editor',
      email: 'editor@example.com',
      password: 'Editor@123',
      permissions: ['read', 'update'],
      description: 'Can edit existing content but cannot delete or create new users.'
    },
    {
      id: 4,
      roleName: 'Viewer',
      email: 'viewer@example.com',
      password: 'Viewer@123',
      permissions: ['read'],
      description: 'Read-only access to content.'
    },
    {
      id: 5,
      roleName: 'HR',
      email: 'hr@example.com',
      password: 'HR@123',
      permissions: ['create', 'read', 'update'],
      description: 'Handles employee profiles and related data.'
    },
    {
      id: 6,
      roleName: 'Finance',
      email: 'finance@example.com',
      password: 'Finance@123',
      permissions: ['read', 'update'],
      description: 'Manages financial records with limited access.'
    },
    {
      id: 7,
      roleName: 'Developer',
      email: 'dev@example.com',
      password: 'Dev@123',
      permissions: ['read', 'update', 'create'],
      description: 'Can access development tools and modify application logic.'
    },
    {
      id: 8,
      roleName: 'Support',
      email: 'support@example.com',
      password: 'Support@123',
      permissions: ['read', 'update'],
      description: 'Handles customer issues and support tickets.'
    },
    {
      id: 9,
      roleName: 'Guest',
      email: 'guest@example.com',
      password: 'Guest@123',
      permissions: ['read'],
      description: 'Limited access to public data only.'
    },
    {
      id: 10,
      roleName: 'SuperAdmin',
      email: 'superadmin@example.com',
      password: 'SuperAdmin@123',
      permissions: ['create', 'read', 'update', 'delete', 'manage-roles', 'manage-permissions'],
      description: 'Top-level access, including user roles and system configurations.'
    }
  ];
  