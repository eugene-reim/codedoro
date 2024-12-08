<script>
import { t } from 'svelte-i18n';
</script>

<div class="h-full p-4">
    <h2 class="text-2xl font-bold text-[--text-primary] mb-4">{$t('StatsScreen_Title')}</h2>
    <div class="bg-[--bg-secondary] rounded-lg p-4">
        <p class="text-[--text-secondary]">{$t('StatsScreen_ComingSoonMessage')}</p>
    </div>
</div>
