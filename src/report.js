export default function Report() {
    return (
        <div className="container">
            <div className="page-title">
                <h1>BTN710 Group Project Report</h1>
                <center>Group 6: Kash Faeghi  •  Le Minh Pham  •  Daniel Seguin</center>
            </div>
            <br />
            <div className="download-container">
                <a className="download-btn" target={"_blank"} rel="noreferrer" href="https://drive.google.com/file/d/1dLgN1jrDPq5ezu7H0b2eH41JhCKaQIhM/view?usp=sharing">Download PDF</a>
            </div>
            <div className="section">
                <h3>Section 1: Vulnerability</h3>
                <h4>DDOS Attack</h4>
                <p>For software and applications to function, they need to be able to send requests and receive responses from and to their servers. The Distributed Denial-Of-Service (DDOS) aim is to sabotage this connection. It does so by creating a huge number of requests to the targeted server at once, usually by taking control of multiple compromised computer systems. This creates a sudden ‘traffic jam’ in the server bandwidth, rendering the server unable to handle all the requests properly, including the ‘normal’ ones sent by actual users (hence the name denial-of-service).</p>
                <img src="img/image10.png" alt="DDOS Demonstration" width={624} height={274} />
                <p>To be able to make so many requests at once, attackers often utilize networks of devices (such as phones, computers, IOT devices, etc.) through malware and send the requests from there. These infected devices are called ‘bots’ (or zombies). Since these bots are legitimate devices, separating malicious requests from normal traffic can be challenging.</p>
                <br />
                <h4>SQL Injections</h4>
                <p>To interact with a database, most applications use SQL commands to queries the data. SQL injections happen when the attackers inject malicious code into these SQL commands, accessing unauthorized data or even do other operations on the database with administrative rights (such as modifying or deleting data). In most cases, the malicious SQL statements are injected through input fields or forms where the input data is then directly being put inside an SQL query without any input validation.</p>
                <p>For example, if a system has the following SQL statement:</p>
                <img src="img/image6.png" alt="SQL Statements" width={477} height={53} />
                <p>with #UserId being an input field:</p>
                <img src="img/image4.png" alt="HTML Input Field" width={245} height={48} />
                <p>If the user enter something abnormal, like “105 OR 1=1”, the SQL command will become:</p>
                <img src="img/image8.png" alt="SQL Injected Statement" width={553} height={42} />
                <p>since the “1=1” always returns true, this statement will return ALL the users in the database. This is a classic example of SQL Injections</p>
                <br />
                <h4>Phishing</h4>
                <p>This is a social engineering technique where the attackers trick the users into unauthorized actions via communication channels like e-mail or SMS. Many browsers and communication applications have added features or extensions to detect, alert and remove the malicious emails/messages.</p>
                <img src="img/image9.png" alt="Phishing Example" width={487} height={338} />
                <p><em>Here is an example where the attacker uses an e-mail to attempt to get the victims to go to a site and enter their credentials (Source: Imperva.com)</em></p>
                <br />
                <h4>Cross-Site Request Forgery</h4>
                <p>This is when attackers compromise a legitimate website by tricking users into doing unauthorized actions on websites they trust via HTTP requests. In most websites, the user authentication token, which include sensitive information about the user such as the session cookie, IP address, Windows domain credentials, etc., is included in the browser requests, and therefore the sites cannot differentiate the malicious requests from the normal ones easily.</p>
                <br />
                <h4>Cryptographic Failures</h4>
                <p>Cryptographic failures are sensitive data exposure to passwords, credit card numbers and other sensitive data when at rest or in transit. Some examples of weak cryptographic systems include weak password encryption, invalidated server certificate, or usage of deprecated hash functions such as MD5 or SHA1. Once the attackers get a hold of the exposed encrypted data, they can exploit these cryptographic failures to retrieve the original messages.</p>
                <br />
                <h4>Software and Data Integrity Failures</h4>
                <p>Software and data integrity failures are related to bad program infrastructure for example when the program relies on plugins and libraries from untrusted sources. Attackers can exploit the vulnerabilities in these dependencies to get to our data.</p>
                <br />
            </div>
            <div className="section">
                <h3>Section 2: System Setup</h3>
                <h4>Hardware</h4>
                <ul>
                    <li>Server:
                        <ul>
                            <li>Dell T350 PowerEdge Tower
                                <ul>
                                    <li>Intel® Pentium G3405T 1.5GHz, 2M Cache, 2C/4T, No Turbo (35W), 666 MT/s</li>
                                    <li>4 GB RAM, 800 MT/s</li>
                                    <li>2TB SSD SATA Drives</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>Staff's workstations:
                        <ul>
                            <li>Dell Latitude 3410
                                <ul>
                                    <li>Intel Celeron 5250U</li>
                                    <li>4 GB RAM 1600MHz DDR4</li>
                                    <li>128GB M.2 SSD</li>
                                    <li>Integrated Intel UHD</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <br />
                <h4>Operating System (OS)</h4>
                <p>Both the server and the staff’s computers use Windows 10 Pro English</p>
                <br />
                <h4>Protocols/Services/Applications</h4>
                <p>The staff communicate with each other via their Gmail accounts. They will also need to login to their internal employee portal, which is a web application, in order to manage their work. These will be our two main routes for the attack.</p>
                <br />
                <h4>Description and diagram of network</h4>
                <img src="img/image7.png" alt="Network diagram" width={515} height={297} />
                <br />
                <h4>Protocol/Service Description</h4>
                <ul>
                    <li>The internal employee portal uses MySQL for their database. There are also no input validation when the employees enter their credential. Passwords are encrypted with a hash function with no salt.</li>
                    <li>The server also has relatively low bandwidth, only 250 Mbps.</li>
                    <li>No multi-factor authentication methods are used with the employee’s email accounts and their internal Employee Portal accounts.</li>
                </ul>
                <br />
            </div>
            <div className="section">
                <h3>Section 3: The Exploit</h3>
                <h4>How the exploit works</h4>
                <p>We will send a phishing email to all the staff of the company. The email will ask users to download and install a program that has been infected with a trojan, which will activate when the program is opened. This trojan then gives administrative control of the infected computers to the attacker. This allow the attacker to perform a DDOS attack by using all the infected computers to overload the server with requests. We will perform this attack at rush hour, where the traffic is already high. With the low bandwidth of the server, we expect the system to be vulnerable to this attack.</p>
                <p>The email also prompts the staff to click on a link which will lead to a fake website built by the attacker, and enter their credentials. Once the credentials is collected we can use it to infiltrate the internal Employee Portal. If the victims do not have admin role already, we will then use SQL injection on the Employee Portal, retrieving the credentials of all employees. The passwords are hashed, but no salt was used in the hash function, which means that the same password strings will produce the same hashed string. With this information, we can use dictionary attack techniques such as rainbow tables to retrieve the original password strings. Once we have the data of the users with admin rights, we can pretty much do anything we want with the server.</p>
                <br />
                <h4>Description and diagram of the attack</h4>
                <p>A phishing email will be sent to the staff through their employee’s email with the following content:</p>
                <img src="img/image5.png" alt="example phishing email" width={467} height={263} />
                <p>The email prompts the victims to download an .exe file, which will release a trojan program into the victim’s computers when opened. This trojan will give the attacker administrative access to the employees’ computers, which will then be used to launch the DDOS attack.</p>
                <p>The email also asks the victims to enter their credentials on a fake website that the attacker prepared. We then use these credentials to login to the Employee Portal. In the input field that asks for the employee ID, we inject this following SQL statement:</p>
                <img src="img/image3.png" alt="sql injection demonstration" width={424} height={55} />
                <p>This will give us the credentials of all users in the database. Since the passwords are hashed, but we know no salt is used because there are identical password strings, we can run these passwords through a rainbow table script to retrieve the original passwords. With these information, we can login to the system with admin rights, and take control of the whole server.</p>
                <p><em>Diagram of the attack</em></p>
                <img src="img/image1.png" alt="diagram of the attack" width={624} height={221} />
                <br />
                <h4>Signature of the attack</h4>
                <ul>
                    <li>The DDOS attack will cause a sudden increase in traffic, so if the Employee Portal is suddenly and significantly slower, the company may suspect the DDOS attack</li>
                    <li>Since the phishing website is a fake site, it won’t look polished, and many functionalities will not work, which the victims may notice</li>
                    <li>Gmail (and other mail services) should be able to alert the user that the attachment and the link is not trustworthy</li>
                    <li>If the attacker uses a victim’s account to use the employee website while the victim themselves is still using it, the victim may notice something strange such as seeing unsynchronized information on the site or being logged out of the system</li>
                </ul>
                <br />
            </div>
            <div className="section">
                <h3>Section 4: Security Policy and Controls</h3>
                <h4>How to protect against it</h4>
                <p>DDOS attack can be mitigated by increasing server bandwidth, and having a backup server to reroute the high traffic from the attack. The company should also switch to using cloud services such as AWS or Google Cloud, as they also offer built-in DDOS protection such as more transit capacity and speed, as well as a web application firewall.</p>
                <p>Weak cryptography can be improved by implementing stronger password encryption such as SHA-256 and SHA-3, both of which are recommended by Google. The hashing algorithm must include salt to prevent brute-force or dictionary attacks.</p>
                <p>SQL injections can be prevented by usage of prepared statement or parameterized queries. Here is an example of Java’s PreparedStatement used to prevent SQL injection:</p>
                <img src="img/image2.png" alt="SQL injection prevention by parameterizing input" width={624} height={150} />
                <p>Other options agaisnt SQL injections are allow-list input validation, stored procedures or escaping all characters in user-supplied input.</p>
                <p>Phishing is a social engineering techniques and is difficult to prevent completely. The company can train employees to recognize phishing email, and install plugins in their browser to notify users of malicious e-mails. They can also use multi-factor authentication for their employee’s mail account as well as their Employee Portal accounts, so that even with passwords, the attacker cannot easily get into the victim’s account. It should also notify the user when a login attempt is made.</p>
                <br />
                <h4>Remediated System Test</h4>
                <p>The system now use Google Cloud service to store their server. The plan includes 1TB of storage with 1Gbps transfer speed. This will make it much harder to orchestra a DDOS attack.</p>
                <p>The backend now uses bcrypt hash and salt algorithm to encrypt the passwords. Bcrypt is a Node.js hash algorithm that uses Blowfish cypher. This ensures that brute-force attack and dictionary attacks won’t work even if the attacker somehow get the encrypted passwords.</p>
                <p>The backend also has parameterized SQL queries, while the front-end has an input validation in-place so that input that doesn’t match the expected pattern won’t make it into the SQL statement. The parameterized SQL statements also make it much more difficult to inject SQL commands.</p>
                <p>The company Gmail is now set to scan attached files, alert users of emails from unknown senders, and notify users of logins on new devices. The employee accounts on their internal Employee Portal also require 2-factor authentication via an app on their mobile phone in order to login. This significantly reduce the chances of an employee’s account being compromised.</p>
                <br />
            </div>
            <div className="section">
                <h3>Conclusion</h3>
                <p>In this report, we explore the common vulnerabilities that a website or a web application can face, which includes Distributed Denial-of-Service attack, SQL Injections, Phishing, Cross-site Request Forgery or Cryptographic failures. We also go into detail on how these vulnerabilities can be exploited in a real-life scenario. The consequences of these attacks are catastrophic, as DDOS attack or leaks of sensitive information could cost the company a lot of time and resources to repair. Each of the attacks can be mitigated using corresponding methods, however, they do not guarantee to prevent the attacks completely. Information security is developing in a fast pace, and companies must catch up with the trend in order to keep their digital assets safe.</p>
            </div>
        </div>
    )
}