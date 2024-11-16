<script>
  import { calcOpenDoorPass } from "./qinlin";

  const STORAGE_KEY_MAC = "saved_mac_address";
  const savedMac = localStorage.getItem(STORAGE_KEY_MAC) || "";
  let mac = $state(savedMac);

  const STORAGE_KEY_COMMUNITY_ID = "saved_community_id";
  const savedCommunityId = localStorage.getItem(STORAGE_KEY_COMMUNITY_ID) || "";
  let communityId = $state(savedCommunityId);

  // 使用计算属性（computed）来实时计算 pass, expireDate对象
  let [pass, expireDate] = $derived(calcOpenDoorPass(mac, communityId));
  let expire = $derived(expireDate.toLocaleString());

  $effect(() => {
    if (mac || communityId) {
      localStorage.setItem(STORAGE_KEY_MAC, mac);
      localStorage.setItem(STORAGE_KEY_COMMUNITY_ID, communityId);
    } else {
      localStorage.removeItem(STORAGE_KEY_MAC);
      localStorage.removeItem(STORAGE_KEY_COMMUNITY_ID);
    }
  });
</script>

<div>
  <span>小区ID</span>
  <input type="text" bind:value={communityId} placeholder="输入小区ID" />
</div>

<div>
  <span>门禁MAC地址</span>
  <input type="text" bind:value={mac} placeholder="输入MAC地址" />
</div>

<div>
  <span>密码</span>
  <input type="text" value={pass} readonly placeholder="门禁密码" />
</div>

<div>
  <span>有效期</span>
  <input type="text" value={expire} readonly placeholder="密码有效期" />
</div>
