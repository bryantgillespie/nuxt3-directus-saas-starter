<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Users</h1>
      <p class="mt-2 text-sm text-gray-700">
        Update the users who have access to submit jobs and see jobs on your
        account below.
      </p>
      <VButton
        @click="showUserModal = true"
        class="mt-4 text-right"
        variant="primary"
        >Add New User</VButton
      >
    </div>
    <ul role="list" class="mt-8 space-y-4">
      <li v-for="user in users" :key="user.id" class="w-full">
        <UserCard
          :name="user.first_name + ' ' + user.last_name"
          :email="user.email"
          :avatar="fileUrl(user.avatar)"
          :is-admin="user.account_admin"
          @edit="editUser(user.id)"
          @delete="deleteUser(user)"
        />
      </li>
    </ul>
    <VModal
      :title="selectedUserId ? 'Edit User' : 'New User'"
      :is-open="showUserModal"
      @close="closeModal"
    >
      <UserForm
        :user-id="selectedUserId"
        @success="success"
        @cancel="closeModal"
      />
    </VModal>
    <VDialog
      type="danger"
      confirmText="Deactivate User"
      :onConfirm="() => deactivateUser(user)"
      :is-open="showDeleteModal"
      @close="showDeleteModal = false"
    >
      <div class="flex flex-col space-y-4">
        <p class="text-sm text-gray-700">
          Are you sure you want to deactivate this user?
        </p>
        <p class="text-sm text-gray-500">
          The user will no longer have access to login or view and submit jobs.
        </p>
      </div>
    </VDialog>
  </div>
</template>

<script setup>
const { fileUrl } = useFiles()
const { $toast } = useNuxtApp()

const showUserModal = ref(false)
async function closeModal() {
  showUserModal.value = false
}
</script>
