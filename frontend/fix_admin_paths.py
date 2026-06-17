import os
import glob

def main():
    search_dir = r"d:\Luyen Python\KHACHSAN\kh2\accommodation_booking\frontend\src\features\dashboard\admin"
    files = glob.glob(os.path.join(search_dir, "**/*.jsx"), recursive=True)
    
    for file_path in files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = content.replace('"/admin/wards"', '"/admin/dashboard/wards"')
        new_content = new_content.replace('"/admin/wards/new"', '"/admin/dashboard/wards/new"')
        new_content = new_content.replace('"/admin/amenities/new"', '"/admin/dashboard/amenities/new"')
        new_content = new_content.replace('"/admin/amenities"', '"/admin/dashboard/amenities"')
        new_content = new_content.replace('"/admin/users"', '"/admin/dashboard/users"')
        new_content = new_content.replace('"/admin/users/new"', '"/admin/dashboard/users/new"')
        new_content = new_content.replace('`/admin/users/', '`/admin/dashboard/users/')
        new_content = new_content.replace('"/admin/category-amenities/new"', '"/admin/dashboard/category-amenities/new"')
        new_content = new_content.replace('`/admin/category-amenities/', '`/admin/dashboard/category-amenities/')
        new_content = new_content.replace('"/admin/category-amenities"', '"/admin/dashboard/category-amenities"')
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {file_path}")

if __name__ == "__main__":
    main()
