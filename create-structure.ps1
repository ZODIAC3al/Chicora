# Save this as create-structure.ps1 and run it

$folders = @(
    "src/assets/images",
    "src/assets/icons",
    "src/assets/fonts",
    "src/components/animations",
    "src/components/ui",
    "src/components/layout",
    "src/components/cart",
    "src/components/products",
    "src/components/shared",
    "src/config",
    "src/context",
    "src/features/auth/components",
    "src/features/auth/hooks",
    "src/features/auth/services",
    "src/features/cart/components",
    "src/features/cart/hooks",
    "src/features/cart/services",
    "src/features/products/components",
    "src/features/products/hooks",
    "src/features/products/services",
    "src/features/search/components",
    "src/hooks",
    "src/lib",
    "src/pages/Home",
    "src/pages/Products",
    "src/pages/Cart",
    "src/pages/Checkout",
    "src/pages/Auth",
    "src/pages/Dashboard",
    "src/pages/Error",
    "src/styles/base",
    "src/styles/components"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Created folder: $folder"
    }
}

# Create essential files
@"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
"@ | Out-File -FilePath "src/config/supabase.js" -Encoding utf8

@"
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};
"@ | Out-File -FilePath "src/config/routes.js" -Encoding utf8

Write-Host "Folder structure and base files created successfully!"