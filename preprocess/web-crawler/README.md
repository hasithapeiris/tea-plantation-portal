### Create `Requirements.tsx`

```bash
pip freeze > requirements.txt
```

To install Python dependencies listed in a `requirements.txt` file, follow these steps:

### Steps to Install Dependencies

1. **Ensure You Have Python and pip Installed**
   Make sure Python and `pip` (Python's package manager) are installed. Check with:

   ```bash
   python --version
   pip --version
   ```

2. **Activate Your Virtual Environment** (Optional but Recommended)
   It's best practice to use a virtual environment to avoid polluting your system Python installation. Create and activate a virtual environment:

   ```bash
   python -m venv venv    # Create virtual environment
   source venv/bin/activate   # Activate on macOS/Linux
   venv\Scripts\activate.bat  # Activate on Windows
   ```

3. **Install Dependencies**
   Use `pip` to install dependencies from the `requirements.txt` file:
   ```bash
   pip install -r requirements.txt
   ```

### Example `requirements.txt` File

A typical `requirements.txt` might look like this:

```plaintext
Flask==2.3.2
requests>=2.25.0
numpy~=1.21.0
```

### Notes:

- `==`: Installs a specific version.
- `>=`: Installs the specified version or higher.
- `~=`: Installs a compatible version, e.g., `1.21.0` to `<1.22.0`.

### Verify Installation

After installation, you can check the installed packages:

```bash
pip list
```

### Common Issues

1. **Missing `requirements.txt` File**
   Ensure the `requirements.txt` file exists in your current directory. Use:

   ```bash
   ls    # macOS/Linux
   dir   # Windows
   ```

2. **Permissions Error**
   If you encounter permissions issues, use the `--user` flag (not recommended for virtual environments):
   ```bash
   pip install --user -r requirements.txt
   ```
