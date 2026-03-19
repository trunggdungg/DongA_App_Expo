import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Header,
  RadioListItem,
  SectionLabel,
  Button,
} from '@/components';
import { assetService, storageService, Asset } from '@/services';
import {Colors} from '@/utils';

interface FacilitySelectScreenProps {
  onLogout?: () => void;
  onFacilitySelect?: (facilityId: string, facilityName: string) => void;
}

const FacilitySelectScreen: React.FC<FacilitySelectScreenProps> = ({
  onLogout,
  onFacilitySelect,
}) => {
  const [facilities, setFacilities] = useState<Asset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFacilities = async () => {
    try {
      const token = await storageService.getToken();
      if (!token) {
        Alert.alert('Lỗi', 'Phiên đăng nhập hết hạn');
        onLogout?.();
        return;
      }

      const result = await assetService.getAssets(token, {
        profileName: 'FACILITY',
        pageSize: 100,
        page: 0,
      });

      if (result.success && result.data) {
        setFacilities(result.data.data);
        if (result.data.data.length > 0) {
          setSelectedId(result.data.data[0].id.id);
        }
      } else {
        Alert.alert('Lỗi', result.error || 'Không thể tải danh sách cơ sở');
      }
    } catch {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            await storageService.clearAuth();
            onLogout?.();
          },
        },
      ],
    );
  };

  const handleContinue = () => {
    if (!selectedId) {
      Alert.alert('Thông báo', 'Vui lòng chọn một cơ sở');
      return;
    }
    const selected = facilities.find(f => f.id.id === selectedId);
    if (selected && onFacilitySelect) {
      onFacilitySelect(selected.id.id, selected.label ?? selected.name);
    }
  };

  const handleMenuPress = (facility: Asset) => {
    Alert.alert(facility.name, 'Tùy chọn cho cơ sở này');
  };

  const renderItem = ({ item }: { item: Asset }) => (
    <RadioListItem
      label={item.label ?? item.name}
      selected={selectedId === item.id.id}
      onPress={() => setSelectedId(item.id.id)}
      onMenuPress={() => handleMenuPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Chọn địa điểm"
        subtitle="Hãy chọn một địa điểm để tiếp tục"
        showBackButton={false}
        rightComponent={
          <Button
            title="Đăng xuất"
            variant="text"
            color="error"
            onPress={handleLogout}
            textStyle={styles.logoutText}
          />
        }
      />

      <View style={styles.content}>
        <SectionLabel label="Danh sách địa điểm đã có" />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary.main} />
          </View>
        ) : (
          <FlatList
            data={facilities}
            renderItem={renderItem}
            keyExtractor={item => item.id.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}

        <Button
          title="+ TẠO ĐỊA ĐIỂM MỚI"
          variant="text"
          color="primary"
          onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
          style={styles.addButton}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="TIẾP TỤC"
          onPress={handleContinue}
          disabled={!selectedId}
          style={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  addButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
  },
  continueButton: {
    backgroundColor: Colors.primary.main,
    height: 48,
  },
  logoutText: {
    fontSize: 12,
    textTransform: 'none',
  },
});

export default FacilitySelectScreen;