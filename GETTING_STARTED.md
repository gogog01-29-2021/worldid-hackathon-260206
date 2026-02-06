# Getting Started Guide

## 🚀 Quick Start

Your application is already running! Here's how to get started:

### 1. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Interactive Swagger UI)

### 2. First Steps as an Organizer

#### Step 1: Register as an Organizer

1. Open http://localhost:5173 in your browser
2. Click **"Organizer Dashboard"** in the navigation
3. You'll see a login/register form
4. Click **"Register"** (or use the register endpoint directly)
5. Fill in:
   - **Email**: Your email address
   - **Password**: A secure password
   - **Name**: Your organizer name

**Using API directly:**
```bash
curl -X POST http://localhost:8000/api/organizers/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "organizer@example.com",
    "password": "securepassword123",
    "name": "My Organization"
  }'
```

#### Step 2: Login

1. After registration, login with your credentials
2. You'll receive a JWT token (stored in localStorage for the web app)

**Using API directly:**
```bash
curl -X POST http://localhost:8000/api/organizers/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "organizer@example.com",
    "password": "securepassword123"
  }'
```

Response will include an `access_token` - save this for authenticated requests.

#### Step 3: Create an Event

Once logged in, you can create events with rewards:

1. In the Organizer Dashboard, click **"Create New Event"**
2. Fill in event details:
   - **Name**: Event name
   - **Description**: Event description
   - **Start Date** (optional)
   - **End Date** (optional)
3. Add rewards:
   - **Reward Type**: ERC20, ERC721, or ERC1155
   - **Token Address**: Contract address (use `0x0` for native ETH)
   - **Amount**: For ERC20 tokens
   - **Token ID**: For ERC721/ERC1155 NFTs
   - **Name** and **Description**: Reward details

**Using API directly:**
```bash
curl -X POST http://localhost:8000/api/organizers/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Test Event",
    "description": "A test event for rewards",
    "rewards": [
      {
        "reward_type": "ERC20",
        "token_address": "0x0",
        "amount": "1.5",
        "name": "Test Token Reward",
        "description": "1.5 tokens per participant"
      }
    ]
  }'
```

### 3. Testing as a Participant

#### Step 1: Browse Events

1. Go to http://localhost:5173/events
2. You'll see all available events
3. Click **"View Details"** on any event

#### Step 2: Connect Your Wallet

1. Click **"Connect Wallet"** button
2. Connect with MetaMask or another injected wallet
3. Your wallet address will be displayed

#### Step 3: Join an Event

1. On the event detail page, click **"Join Event"**
2. You'll be prompted to verify with WorldID:
   - Click **"Verify with WorldID"**
   - Complete the WorldID verification process
3. After successful verification, you'll be registered for the event

**Using API directly:**
```bash
curl -X POST http://localhost:8000/api/events/1/join \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0xYourWalletAddress",
    "worldid_proof": {
      "merkle_root": "...",
      "nullifier_hash": "...",
      "proof": "...",
      "verification_level": "orb",
      "signal": "..."
    }
  }'
```

#### Step 4: Claim Rewards

1. After joining, you can claim rewards
2. Click **"Claim Reward"** button
3. Verify with WorldID again (fresh proof required)
4. The system will:
   - Verify your WorldID proof
   - Check you haven't claimed before
   - Process the blockchain transaction
   - Record the claim

**Using API directly:**
```bash
curl -X POST http://localhost:8000/api/events/1/claim \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0xYourWalletAddress",
    "worldid_proof": {
      "merkle_root": "...",
      "nullifier_hash": "...",
      "proof": "...",
      "verification_level": "orb",
      "signal": "..."
    }
  }'
```

## 🔐 Important Security Features

1. **One Wallet Per WorldID**: Each WorldID can only be linked to one wallet address
2. **One Claim Per Event**: Each WorldID can only claim once per event
3. **Fresh Proof Required**: Each claim requires a new WorldID proof
4. **Rate Limiting**: API endpoints are rate-limited to prevent abuse

## 📋 Testing Checklist

### As Organizer:
- [ ] Register an account
- [ ] Login successfully
- [ ] Create an event with rewards
- [ ] View your events list
- [ ] View event participants
- [ ] View claim history

### As Participant:
- [ ] Browse available events
- [ ] View event details
- [ ] Connect wallet
- [ ] Join an event (with WorldID verification)
- [ ] Claim rewards (with WorldID verification)
- [ ] Verify you cannot claim twice

## 🛠️ Using the API Documentation

The interactive API documentation at http://localhost:8000/docs allows you to:

1. **Explore all endpoints**: See all available API routes
2. **Test endpoints**: Click "Try it out" on any endpoint
3. **Authenticate**: Click the "Authorize" button and enter your JWT token
4. **View schemas**: See request/response formats

## 🔧 Configuration

### Environment Variables

Make sure these are set in your `.env` file or Docker Compose:

- `WORLDID_APP_ID`: Your WorldID application ID
- `WORLDID_ACTION`: Action identifier for WorldID verification
- `ETHEREUM_RPC_URL`: Ethereum RPC endpoint (for blockchain interactions)
- `PRIVATE_KEY`: Private key for sending transactions (optional, for testing)
- `SECRET_KEY`: JWT secret key (change in production!)

### WorldID Setup

1. Get your WorldID App ID from https://developer.worldcoin.org/
2. Set `WORLDID_APP_ID` in your environment
3. Use the staging app ID for testing: `app_staging_123`

## 📊 Monitoring

### Check Service Status

```bash
# View all services
docker-compose ps

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db

# Check backend health
curl http://localhost:8000/health
```

### Database Access

```bash
# Connect to PostgreSQL
docker-compose exec db psql -U postgres -d worldid_rewards

# View tables
\dt

# View organizers
SELECT * FROM organizers;

# View events
SELECT * FROM events;

# View participants
SELECT * FROM participants;

# View claims
SELECT * FROM claims;
```

## 🎯 Next Steps

1. **Customize Events**: Create events with different reward types
2. **Test Duplicate Prevention**: Try claiming twice with the same WorldID
3. **Test Wallet Linking**: Try linking a different wallet to the same WorldID
4. **Monitor Claims**: Check the organizer dashboard for claim statistics
5. **Configure Blockchain**: Set up proper RPC URLs and private keys for real transactions

## 🐛 Troubleshooting

### Frontend not loading?
- Check: `docker-compose logs frontend`
- Verify port 5173 is not in use
- Restart: `docker-compose restart frontend`

### Backend errors?
- Check: `docker-compose logs backend`
- Verify database is healthy: `docker-compose ps db`
- Check API docs: http://localhost:8000/docs

### WorldID verification failing?
- Verify `WORLDID_APP_ID` is set correctly
- Check WorldID proof format matches expected schema
- Ensure you're using the correct action identifier

### Database issues?
- Check: `docker-compose logs db`
- Restart database: `docker-compose restart db`
- Reset database: `docker-compose down -v` (⚠️ deletes all data)

## 📚 Additional Resources

- **WorldID Documentation**: https://docs.world.org/world-id
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **wagmi Documentation**: https://wagmi.sh/
- **React Router**: https://reactrouter.com/

---

**Happy Building! 🚀**
