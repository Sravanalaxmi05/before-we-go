"""Conservative publication check; reports locations, never matching secret values.
Scans all reachable Git blobs and current tracked/added files. Not a security guarantee.
"""
from pathlib import Path
import re, subprocess, sys
root=Path(__file__).resolve().parents[1]
def git(*args):
    return subprocess.check_output(['git','-C',str(root),*args])
patterns={
 'credential':rb'(?:iams_live_|github_pat_|gh[pousr]_|sk_live_|sk-proj-)[A-Za-z0-9_-]{12,}',
 'private key':rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY',
 'provider call identifier':rb'call_[A-Za-z0-9_-]{15,}',
}
values=[]
for name in ['.env.local','.dev.vars']:
    path=root/name
    if path.exists():
        for line in path.read_text().splitlines():
            if '=' not in line or line.lstrip().startswith('#'):continue
            key,value=line.split('=',1);value=value.strip().strip('\"\'')
            if key.strip() in ['CALLE_API_KEY','OWNER_USER_ID','TEST_RECIPIENT'] and len(value)>7:
                values.append(value.encode())
                if key.strip()=='TEST_RECIPIENT':values.append(re.sub(rb'\D',b'',value.encode()))
findings=set();count=0

def check(name,data):
    for label,pattern in patterns.items():
        if re.search(pattern,data):findings.add((name,label))
    if any(value in data for value in values):findings.add((name,'configured private value'))
    if re.search(r'(^|/)(\.env(?:\..*)?|\.dev.vars.*|\.wrangler)(/|$)|\.(sqlite|pem|wav|mp4)$',name) and name!='.env.example':
        findings.add((name,'private artifact path'))
for row in git('rev-list','--objects','--all').decode().splitlines():
    oid,_,name=row.partition(' ')
    if not name or git('cat-file','-t',oid).strip()!=b'blob':continue
    count+=1;check(name,git('cat-file','blob',oid))
for name in git('ls-files','-z').decode().split('\0'):
    path=root/name
    if name and path.is_file():check(name,path.read_bytes())
for name,label in sorted(findings):print(f'REVIEW {name}: {label}')
print(f'Checked {count} historical blobs and current tracked files; {len(findings)} findings.')
sys.exit(bool(findings))
