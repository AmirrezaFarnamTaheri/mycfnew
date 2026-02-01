# The Mailman Analogy: Understanding How Proxies Work 📬

To fully understand how this tool bypasses censorship, let's visualize it as a **Secure Postal Service**.

## The Roles 🎭

*   **You (Client)**: The sender of a letter. You want to send a message to **YouTube**.
*   **The Firewall (The Censor)**: A strict inspector at the local post office who reads the "To:" address on every envelope. If he sees "YouTube", he burns the letter.
*   **Cloudflare Worker (The Hub)**: A massive, trusted international logistics hub.
*   **UUID (The Secret Stamp)**: A special, invisible stamp on your envelope that proves you are a verified customer.
*   **ProxyIP (The Courier)**: A delivery driver who takes the package from the Hub to the final destination.

---

## The Process 🔄

### 1. The Packaging (TLS & Encryption) ✉️
You write a letter to YouTube. But you can't send it directly.
*   **Encryption**: First, you write the letter in a secret code (Cipher) that only the Hub can read.
*   **The Outer Envelope**: You put the letter inside an envelope.
*   **The Address**: You write **"To: Cloudflare Hub"** on the envelope. You **do not** write "YouTube".
*   **The Secret Stamp (UUID)**: You stamp the back with your UUID.

### 2. Passing the Censor (Transmission) 👮‍♂️
You drop the letter in the mailbox.
*   The **Inspector (Firewall)** looks at the envelope.
*   He sees "To: Cloudflare". Cloudflare is a legitimate business used by banks and shops.
*   He cannot see inside (Encryption).
*   He lets it pass.

### 3. At the Hub (The Worker) 🏭
The letter arrives at the Cloudflare Worker.
*   **Verification**: The Worker checks the **UUID stamp**.
    *   *Wrong stamp?* The letter is shredded (Connection Closed).
    *   *Valid stamp?* The Worker opens the envelope.
*   **Decryption**: The Worker decodes the message and sees: *"Please fetch this video from YouTube."*

### 4. The Last Mile (Routing) 🚚
Now the Worker needs to get the video from YouTube.
*   **Method A (Direct)**: The Worker goes to YouTube directly.
    *   *Risk*: YouTube sees the Worker's uniform (Cloudflare IP). Some sites (like Netflix) don't like this.
*   **Method B (ProxyIP)**: The Worker hands the request to a freelance courier (**ProxyIP**).
    *   The courier goes to YouTube. YouTube sees a normal residential person (Residential IP).
    *   The courier gets the video and brings it back to the Worker.

### 5. The Return Trip ↩️
The Worker puts the video tape in a new envelope, writes "From: Cloudflare", and sends it back to you. The Inspector sees a package from Cloudflare and lets it through.

---

## Advanced Evasion Techniques 🥷

### Encrypted Client Hello (ECH) - The "Double Envelope"
Usually, even with TLS, the "To:" address (SNI) is visible during the first handshake.
*   **Without ECH**: You say "Hello Cloudflare!" loudly. The Inspector hears it.
*   **With ECH**: You put the *entire* envelope inside a bigger, opaque box. The box has **no** label other than "To: The Cloud".
*   The Inspector doesn't even know which *part* of Cloudflare you are talking to. This is the cutting edge of privacy.

### Fragmentation - The "Shredder"
Instead of sending the letter in one piece, you cut it into 10 tiny strips and mail them one by one.
*   The Inspector sees a strip with "You...". He ignores it.
*   He sees "...Tube". He ignores it.
*   The Worker receives all strips, tapes them together, and reads "YouTube".

### Hysteria / TUIC (UDP) - The "Drone Swarm"
*   **TCP (VLESS)**: Like a truck. It drives on the road, stops at red lights, and signs for delivery. Reliable but can be slow or blocked by roadblocks.
*   **UDP (Hysteria)**: Like a swarm of drones. They fly over traffic, don't wait for signatures, and if one crashes, the others keep going. Much faster for gaming and unstable networks.
