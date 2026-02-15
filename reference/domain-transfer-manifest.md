# Domain Transfer Manifest

**Updated:** 2026-02-08
**Domains:** 2 active, 1 abandoned
**Purpose:** Complete registrar, DNS, and transfer documentation for all owned domains

---

## Domain Inventory

| Domain | Registrar | Status | Expires | Transfer Lock |
|--------|-----------|--------|---------|---------------|
| projectlavos.com | Namecheap | Active | 2026-11-02 | clientTransferProhibited |
| jaspermatters.com | GoDaddy | **ABANDONED** | 2025-12-28 | Letting expire |
| matthewscott.link | Automattic (WordPress) | Active | 2026-11-08 | clientTransferProhibited |

---

## projectlavos.com

**Registrar:** Namecheap, Inc. (IANA ID: 1068)
**Registered:** 2025-11-02
**Expires:** 2026-11-02
**Privacy:** Withheld for Privacy ehf (Iceland)
**DNSSEC:** unsigned

**Nameservers:**
- dns1.registrar-servers.com
- dns2.registrar-servers.com

**DNS Records:**

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | @ | 216.198.79.1 | Namecheap URL redirect to Vercel |
| MX | @ | eforward1-5.registrar-servers.com (pri 10/15/20) | Namecheap email forwarding |
| CNAME | guitar | cname.vercel-dns.com | guitar.projectlavos.com |
| CNAME | jobs | cname.vercel-dns.com | jobs.projectlavos.com |
| CNAME | demos | cname.vercel-dns.com | demos.projectlavos.com |
| CNAME | about | cname.vercel-dns.com | about.projectlavos.com |
| CNAME | mirador | cname.vercel-dns.com | mirador.projectlavos.com |
| CNAME | ourjourney | cname.vercel-dns.com | ourjourney.projectlavos.com |
| CNAME | jobtrack | cname.vercel-dns.com | jobtrack.projectlavos.com |
| CNAME | phishguard | cname.vercel-dns.com | phishguard.projectlavos.com |
| CNAME | ba-pathfinder | cname.vercel-dns.com | ba-pathfinder.projectlavos.com |
| CNAME | resume | cname.vercel-dns.com | resume.projectlavos.com |
| CNAME | prompts | cname.vercel-dns.com | prompts.projectlavos.com |
| CNAME | orchestrator | cname.vercel-dns.com | orchestrator.projectlavos.com |

**Management:** https://www.namecheap.com/myaccount/ (guitargnarr account)

---

## jaspermatters.com (ABANDONED)

**Registrar:** GoDaddy.com, LLC (IANA ID: 146)
**Registered:** 2024-12-28
**Expired:** 2025-12-28
**Status:** Letting expire. Not renewing.

**Decision (2026-02-08):** Domain not worth redemption fee. The code and deployment are independent of the domain:
- Code: GitHub (guitargnarr/jaspermatters-job-intelligence)
- Deployment: jaspermatters-job-intelligence.vercel.app (still live)
- Local: ~/Projects/Career-Business/jaspermatters-job-intelligence


---

## matthewscott.link

**Registrar:** Automattic Inc. (IANA ID: 1531, via WordPress.com)
**Registered:** 2025-11-08
**Expires:** 2026-11-08
**Privacy:** Knock Knock WHOIS Not There, LLC
**DNSSEC:** unsigned

**Nameservers:**
- ns1.wordpress.com
- ns2.wordpress.com
- ns3.wordpress.com

**DNS Records:**

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | @ | 192.0.73.10 | WordPress.com hosting |
| A | @ | 192.0.73.20 | WordPress.com hosting (secondary) |

**No MX records** (no email configured)

**Management:** WordPress.com dashboard (domains section)

---

## Transfer Procedures

### Transferring projectlavos.com (Namecheap -> new registrar)

1. Log into Namecheap dashboard
2. Disable transfer lock (Domain List -> Manage -> Transfer Lock -> Off)
3. Get EPP/authorization code (Sharing & Transfer -> Get Auth Code)
4. Initiate transfer at new registrar with auth code
5. Approve transfer via email confirmation
6. Update nameservers at new registrar if needed
7. Re-verify all 13 CNAME records pointing to cname.vercel-dns.com

### Transferring matthewscott.link (WordPress -> new registrar)

1. Log into WordPress.com dashboard
2. Navigate to Domains -> matthewscott.link -> Transfer
3. Unlock domain and get transfer code
4. Initiate transfer at new registrar
5. WordPress A records will need recreation at new registrar (or point to new host)

---

## Platform Account Credentials

| Platform | Account | Verify With |
|----------|---------|-------------|
| Namecheap | guitargnarr | Dashboard login |
| GoDaddy | (check saved passwords) | Dashboard login |
| WordPress.com | (check saved passwords) | Dashboard login |
| Vercel | guitargnar | `vercel whoami` |
| Netlify | Logged in | `netlify status` |

---

## Emergency DNS Contacts

- **Namecheap support:** https://www.namecheap.com/support/
- **GoDaddy support:** https://www.godaddy.com/help
- **WordPress.com support:** https://wordpress.com/help
- **Vercel DNS docs:** https://vercel.com/docs/projects/domains

---

## Renewal Calendar

| Domain | Renewal Date | Auto-Renew? |
|--------|-------------|-------------|
| projectlavos.com | 2026-11-02 | Check Namecheap settings |
| jaspermatters.com | N/A | Abandoned -- letting expire |
| matthewscott.link | 2026-11-08 | Check WordPress settings |
