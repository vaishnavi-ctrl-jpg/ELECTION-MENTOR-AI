import subprocess

try:
    res = subprocess.run(['npx.cmd', 'jest'], capture_output=True, text=True, cwd=r"c:\Users\Vaishnavi\Desktop\spare 1", encoding='utf-8')
    lines = res.stderr.splitlines()
    for i, l in enumerate(lines):
        if "FAIL" in l or "test(" in l or "expect(" in l or "Test Suites:" in l:
            print(l.encode('ascii', 'ignore').decode('ascii'))
except Exception as e:
    print("Error", e)
