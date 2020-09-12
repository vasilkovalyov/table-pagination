<template>
	<section class="section-table-pagination">
		<b-container>
			<TableUsers :users="members" />
		</b-container>
	</section>
</template>

<script>
	import TableUsers from '@/components/TableUsers';
	import Cookies from 'js-cookie'

	export default {
		name: 'Home',

		data: () => ({
			members: [] 
		}),

		created() {
			const users = JSON.parse(Cookies.get('members'));
			this.members = users.members;
		},

		computed: {
			getMembers() {
				
				return users;
			}
		},

		components: {
			TableUsers
		}
	}
</script>

<style lang="scss">
	.section-table-pagination {
		padding: 50px 0;
	}
</style>